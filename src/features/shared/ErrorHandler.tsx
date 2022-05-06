export type Exception = {
  code: number
  message: string
}

export type ErrorProps = {
  visible: boolean
  message?: string
}

export const ErrorHandler = (props: ErrorProps) => {
  return props.visible ? (
    <div className='text-red-700 mt-2 text-lg'>
      {props.message ?? 'Sorry, something went wrong.'}
    </div>
  ) : null
}
