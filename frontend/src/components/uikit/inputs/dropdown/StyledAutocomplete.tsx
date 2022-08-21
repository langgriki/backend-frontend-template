import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-down.svg';

import styles from './StyledAutocomplete.module.scss';
import { Autocomplete, Paper } from '@mui/material';
import { Input } from '../Input';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { AutocompleteClasses } from '@mui/material/Autocomplete/autocompleteClasses';
import { AutocompleteFreeSoloValueMapping } from '@mui/base/AutocompleteUnstyled/useAutocomplete';

export interface CustomOption {
  label: string;
  onClick: () => void;
}

const caretDown = <ArrowDownIcon className={styles.expandIcon} />;

export type StyledAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  Required extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = Omit<
  AutocompleteProps<T, Multiple, Required, FreeSolo>,
  'disableClearable' | 'renderInput' | 'getOptionLabel'
> & {
  getOptionLabel?:
    | ((
        option: T | AutocompleteFreeSoloValueMapping<FreeSolo>,
      ) => string | number)
    | keyof T
    | undefined;
  /*
   * Could be specified instead of `isOptionEqualToValue`
   */
  idFunction?: PropertyAccessor<T>;
  rootClassName?: string;
  required?: Required;
  testId?: string;
  errorText?: string;
  /*
   * Makes it possible to type right into the input to filter results
   */
  enableSearch?: boolean;
  /*
   * 'normal' - input will have minimal width
   * 'formInput' - input will have the standard width (as all form elements)
   */
  variant?: 'normal' | 'formInput';
  /*
   * You could add more options to Autocomplete beside the standard `menuItems`.
   * It's useful when for example you have a dropdown with categories and want to add a `Add New Category' item
   * Custom options are added to the top of the list.
   */
  customOptions?: CustomOption[];
  /*
   * Header of drop-down popup
   */
  popupHeader?: React.ReactNode;
  /*
   * Footer of drop-down popup
   */
  popupFooter?: React.ReactNode;
};

type OptionType<T> = InternalOptionType | T;
type InternalOptionType =
  | ({ __optionType: 'custom' } & CustomOption)
  | { __optionType: 'not-selected' };
const notSelectedOption: InternalOptionType = { __optionType: 'not-selected' };

export function StyledAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  Required extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: StyledAutocompleteProps<T, Multiple, Required, FreeSolo>,
): JSX.Element {
  const i18next = useTranslation();
  const {
    placeholder,
    rootClassName,
    required,
    testId,
    errorText,
    enableSearch,
    popupHeader,
    popupFooter,
    ...rest
  } = {
    ...props,
    placeholder:
      props.placeholder ?? i18next.t('uikit.inputs.nothing_selected'),
  };

  const classes: Partial<AutocompleteClasses> = useMemo(
    () => ({
      ...props.classes,
      option: clsx(
        styles.optionValue,
        props.variant === 'normal' && styles.optionValueNormal,
        props.classes?.option,
      ),
      popper: clsx(styles.dropdownCallout, props.classes?.popper),
      listbox: clsx(styles.listbox, props.classes?.listbox),
    }),
    [props.classes],
  );

  const getOptionLabel: AutocompleteProps<
    T,
    Multiple,
    Required,
    FreeSolo
  >['getOptionLabel'] = useMemo(() => {
    return (option: any) => {
      if (option === null || option === undefined) return placeholder;

      const getDefaultValue = convertPropertyAccessorToFunction(
        props.getOptionLabel,
      );

      if (typeof option !== 'object') return getDefaultValue(option) as any;

      const internalOption = option as unknown as InternalOptionType;
      if (internalOption.__optionType === 'not-selected') return placeholder;
      if (internalOption.__optionType === 'custom') return internalOption.label;

      return getDefaultValue(option) as any;
    };
  }, [props.getOptionLabel, placeholder]);

  // handle equality for CustomOptions
  const isOptionEqualToValue: AutocompleteProps<
    T,
    Multiple,
    Required,
    FreeSolo
  >['isOptionEqualToValue'] = useMemo(() => {
    const original = getEqualityFunction(
      props.isOptionEqualToValue,
      props.idFunction,
    );

    return (option1, option2) => {
      if (original(option1, option2)) return true;

      if (
        option1 === null ||
        option1 === undefined ||
        option2 === null ||
        option2 === undefined
      )
        return false;

      if (typeof option1 !== 'object' || typeof option2 !== 'object')
        return false;

      const internalOption1 = option1 as unknown as InternalOptionType;
      const internalOption2 = option2 as unknown as InternalOptionType;
      if (
        internalOption1.__optionType === 'custom' &&
        internalOption2.__optionType === 'custom'
      ) {
        return internalOption1.label == internalOption2.label;
      }
      return false;
    };
  }, [props.getOptionLabel, placeholder]);

  const options: T[] = useMemo(() => {
    const result: T[] = [];
    if (!required && !props.multiple) {
      if (!props.options.includes(null!))
        result.push(notSelectedOption as OptionType<T> as any);
    }
    if (props.customOptions) {
      result.push(
        ...props.customOptions.map(
          (x) => ({ __optionType: 'custom', ...x } as OptionType<T> as any),
        ),
      );
    }

    result.push(...props.options);

    // update selected value
    if (props.value) {
      let newSelectedValues: any;
      if (props.multiple) {
        newSelectedValues = result.filter((x) =>
          (props.value as any).includes((z: any) => isOptionEqualToValue(x, z)),
        );
      } else {
        newSelectedValues = result.find((x) =>
          isOptionEqualToValue(x, props.value as any),
        );
      }
      props.onChange?.({} as any, newSelectedValues, 'selectOption');
    }

    return result;
  }, [required, props.options, props.customOptions]);

  // handle CustomOptions selection
  const onChange: typeof props['onChange'] = useMemo(() => {
    if (!props.customOptions || props.customOptions.length === 0)
      return props.onChange;

    return (event, value, reason, details) => {
      if (typeof value === 'object') {
        const internalOption = value as unknown as InternalOptionType;
        if (internalOption.__optionType === 'custom') {
          internalOption.onClick();
          return;
        }
      }
      props.onChange?.(event, value, reason, details);
    };
  }, [props.onChange, props.customOptions]);

  const paperComponentWithHeaderFooter = useMemo(() => {
    if (!popupHeader && !popupFooter) return undefined;
    return (paperProps: any) => (
      <Paper {...paperProps}>
        {popupHeader}
        {paperProps.children}
        {popupFooter}
      </Paper>
    );
  }, [popupHeader, popupFooter]);

  return (
    <div
      className={clsx(styles.rootContainer, rootClassName)}
      style={props.style}
    >
      <Autocomplete
        {...rest}
        options={options}
        renderInput={(params) => {
          const value = props.multiple
            ? (params.InputProps.startAdornment as string) ?? ''
            : params.inputProps.value;
          return (
            <Input
              containerRef={params.InputProps.ref}
              placeholder={placeholder}
              {...params.inputProps}
              className={clsx(
                params.inputProps.className,
                styles.nonEditableInput,
              )}
              value={value}
              size={undefined}
              readOnly={!enableSearch}
              endAdornment={caretDown}
              variant={props.variant}
            />
          );
        }}
        PaperComponent={paperComponentWithHeaderFooter}
        classes={classes}
        data-test-id={testId}
        data-error={!!errorText}
        placeholder={placeholder}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={onChange}
        disableClearable={props.required}
        value={props.value ?? null!}
      />
      {!!errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
}
function defaultEqualityFunction(x: any, y: any) {
  return x == y;
}

function convertPropertyAccessorToEqualityFunction<T>(
  key: keyof T,
): (option1: T, option2: T) => boolean {
  const propertyAccessorFunction = convertPropertyPathToFunction(key);
  return (option1, option2) =>
    propertyAccessorFunction(option1) == propertyAccessorFunction(option2);
}

type PropertyAccessor<T> = ((option: T) => string | number) | keyof T;

export function convertPropertyAccessorToFunction<
  T,
  Multiple extends boolean | undefined,
  Required extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(getOptionLabel?: PropertyAccessor<T>): (option: T) => string {
  return getOptionLabel
    ? typeof getOptionLabel !== 'function'
      ? convertPropertyPathToFunction(getOptionLabel)
      : (getOptionLabel as any)
    : (option1: any) => option1 as any;
}
export function convertPropertyPathToFunction<T>(
  key: keyof T,
): (option: any) => string {
  return (option: T) =>
    option === null || option === undefined || typeof option !== 'object'
      ? (option as any)
      : option[key];
}
function getEqualityFunction<T>(
  isOptionEqualToValue: StyledAutocompleteProps<
    T,
    false,
    false,
    false
  >['isOptionEqualToValue'],
  idFunction: StyledAutocompleteProps<T, false, false, false>['idFunction'],
) {
  if (isOptionEqualToValue) return isOptionEqualToValue;
  if (!idFunction) return defaultEqualityFunction;

  if (typeof idFunction !== 'function') {
    return convertPropertyAccessorToEqualityFunction(idFunction);
  }

  return (option1: T, option2: T) => idFunction(option1) == idFunction(option2);
}
