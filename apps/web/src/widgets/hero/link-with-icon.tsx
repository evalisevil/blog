import Link from 'next/link'

export const LinkWithIcon = ({
  href,
  icon,
  name,
}: {
  href: string
  icon: React.ReactNode
  name: string
}) => {
  return (
    <Link
      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
      href={href}
    >
      {icon}
      {name}
    </Link>
  )
}
