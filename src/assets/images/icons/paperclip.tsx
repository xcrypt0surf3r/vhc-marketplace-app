type Props = {
  color?: string
  size?: number
}

const PaperclipIcon = ({ color, size = 2 }: Props) => (
  <svg
    fill={`${color || '#292D32'}`}
    viewBox='0 0 20 20'
    width={`${size * 10}px`}
    height={`${size * 10}px`}
  >
    <path d='M13.491 1.6665H6.50768C3.47435 1.6665 1.66602 3.47484 1.66602 6.50817V13.4832C1.66602 16.5248 3.47435 18.3332 6.50768 18.3332H13.4827C16.516 18.3332 18.3243 16.5248 18.3243 13.4915V6.50817C18.3327 3.47484 16.5243 1.6665 13.491 1.6665ZM13.641 12.1915L11.791 14.0415C11.341 14.4915 10.7577 14.7082 10.1743 14.7082C9.59102 14.7082 8.99935 14.4832 8.55768 14.0415C7.66602 13.1498 7.66602 11.6915 8.55768 10.7998L9.73268 9.62484C9.97435 9.38317 10.3743 9.38317 10.616 9.62484C10.8577 9.8665 10.8577 10.2665 10.616 10.5082L9.44102 11.6832C9.03268 12.0915 9.03268 12.7498 9.44102 13.1582C9.84935 13.5665 10.5077 13.5665 10.916 13.1582L12.766 11.3082C13.2743 10.7998 13.5577 10.1165 13.5577 9.3915C13.5577 8.6665 13.2743 7.9915 12.766 7.47484C11.741 6.44984 9.95768 6.44984 8.93268 7.47484L6.90768 9.49984C6.04102 10.3665 6.04102 11.7832 6.90768 12.6582C7.14935 12.8998 7.14935 13.2998 6.90768 13.5415C6.66602 13.7832 6.26602 13.7832 6.02435 13.5415C4.66602 12.1832 4.66602 9.97484 6.02435 8.6165L8.04102 6.59984C8.79102 5.84984 9.78268 5.4415 10.841 5.4415C11.8993 5.4415 12.891 5.84984 13.641 6.59984C14.391 7.34984 14.7993 8.3415 14.7993 9.39984C14.7993 10.4582 14.391 11.4498 13.641 12.1915Z' />
  </svg>
)

export { PaperclipIcon }
