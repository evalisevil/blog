import Image from 'next/image'
import { FaGithubAlt } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { PiSparkleFill } from 'react-icons/pi'

import { LinkWithIcon } from '../../pages/home/ui/link-with-icon'

const BLOG_TITLE = '🦄 MY BLOG'
const DESCRIPTION = (
  <>
    개발 경험과 기술적 인사이트를 공유합니다. <br />
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, harum.
  </>
)
const HERO_IMAGE_URL = '/images/hero.png'

const LINKS = [
  {
    href: `mailto:cukehater@gmail.com`,
    icon: <IoIosMail />,
    name: 'E-Mail',
  },
  {
    href: `https://github.com/cukehater`,
    icon: <FaGithubAlt />,
    name: 'Github',
  },
  {
    href: `https://portfolio.cukehater.com`,
    icon: <PiSparkleFill />,
    name: 'Portfolio',
  },
  {
    href: `https://resume.cukehater.com`,
    icon: <IoDocumentTextSharp />,
    name: 'Resume',
  },
]

export const Hero = () => {
  return (
    <section className="flex items-center gap-8 pb-12 mb-12 border-b border-muted-foreground/10">
      <div className="relative w-30 h-30 rounded-full overflow-hidden">
        <Image
          fill
          alt="Hero"
          src={HERO_IMAGE_URL}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{BLOG_TITLE}</h2>
        <p className="text-sm text-muted-foreground">{DESCRIPTION}</p>
        <nav className="flex gap-3 justify-center sm:justify-start">
          {LINKS.map((link) => (
            <LinkWithIcon key={link.href} href={link.href} icon={link.icon} name={link.name} />
          ))}
        </nav>
      </div>
    </section>
  )
}
