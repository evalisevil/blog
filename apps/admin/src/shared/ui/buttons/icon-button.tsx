import { Button } from '../shadcn/button'

export const IconButton = ({
  icon,
  label,
  ...props
}: { icon: React.ReactNode; label: string } & React.ComponentProps<typeof Button>) => {
  return (
    <Button className="gap-2" type="button" {...props}>
      {icon}
      {label}
    </Button>
  )
}
