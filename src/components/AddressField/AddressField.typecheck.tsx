// Compile-only regressions checked by tsc. These declarations generate no runtime tests.
import React from 'react'
import type { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input'
import { AddressField } from './index'
import type { AddressFieldProps, AddressFieldChangeData } from './index'

type Assert<T extends true> = T
type Assignable<From, To> = From extends To ? true : false
type Resolver = AddressFieldProps['resolveName']
type LegacyHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  data: InputOnChangeData
) => void
type ModernHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  data: AddressFieldChangeData
) => void

export type AcceptLegacyHandler = Assert<
  Assignable<LegacyHandler, AddressFieldProps['onChange']>
>
export type AcceptModernHandler = Assert<
  Assignable<
    ModernHandler,
    AddressFieldProps<AddressFieldChangeData>['onChange']
  >
>
export type AcceptFieldProps = Assert<
  Assignable<
    {
      resolveName: Resolver
      label: string
      kind: 'full'
      disabled: boolean
      resolverKey: number
    },
    AddressFieldProps
  >
>
export type PreserveValueType = Assert<
  Assignable<AddressFieldChangeData['value'], string>
>
export type PreserveActualError = Assert<
  Assignable<Error, AddressFieldChangeData['error']>
>
export type RejectNumericLabel = Assert<
  // @ts-expect-error AddressField retains Field's string label despite its index signature.
  Assignable<{ resolveName: Resolver; label: number }, AddressFieldProps>
>
export type RejectUnknownKind = Assert<
  // @ts-expect-error Field kind is restricted to simple or full.
  Assignable<{ resolveName: Resolver; kind: 'other' }, AddressFieldProps>
>
export type RejectStringDisabled = Assert<
  // @ts-expect-error Named input properties remain checked as well.
  Assignable<{ resolveName: Resolver; disabled: string }, AddressFieldProps>
>
export type RejectBooleanRuntimeError = Assert<
  // @ts-expect-error The accurate emitted payload never represents an error as a boolean.
  Assignable<boolean, AddressFieldChangeData['error']>
>

// Never invoked. Check real JSX contextual inference without adding runtime test work.
export function checkAddressFieldCallbacks(
  resolveName: Resolver,
  setBoolean: (value: boolean | undefined) => void,
  modernHandler: ModernHandler,
  legacyHandler: LegacyHandler
) {
  const legacyProps: AddressFieldProps = {
    resolveName,
    onChange: (_, data) => setBoolean(data.error)
  }
  const modernProps: AddressFieldProps<AddressFieldChangeData> = {
    resolveName,
    onChange: modernHandler
  }
  return (
    <>
      <AddressField
        resolveName={resolveName}
        onChange={(_, data) => setBoolean(data.error)}
      />
      <AddressField resolveName={resolveName} onChange={legacyHandler} />
      <AddressField resolveName={resolveName} onChange={modernHandler} />
      <AddressField {...legacyProps} />
      <AddressField {...modernProps} />
    </>
  )
}
