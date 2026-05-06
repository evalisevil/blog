import Image from 'next/image'
import { FaGithubAlt } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { PiSparkleFill } from 'react-icons/pi'

import { LinkWithIcon } from './link-with-icon'

const NAME = 'John Doe'
const DESCRIPTION = (
  <>
    개발 경험과 기술적 인사이트를 공유합니다. <br />
    Lorem ipsum, dolor sit amet consectetur <br />
    adipisicing elit. Ipsa, harum.
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
    <section className="flex items-center gap-4 md:gap-8 pb-8 mb-8 md:pb-12 md:mb-12 border-b border-muted-foreground/10 md:flex-row flex-col">
      <div className="relative w-30 h-30 rounded-full overflow-hidden">
        <Image
          fill
          alt="Hero"
          src={HERO_IMAGE_URL}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      <div className="flex-1 space-y-2 md:text-left text-center">
        <h2 className="md:text-2xl text-xl font-bold">{NAME}</h2>
        <p className="md:text-sm text-xs text-muted-foreground">{DESCRIPTION}</p>
        <nav className="flex gap-3 justify-center sm:justify-start">
          {LINKS.map((link) => (
            <LinkWithIcon key={link.href} href={link.href} icon={link.icon} name={link.name} />
          ))}
        </nav>
      </div>
    </section>
  )
}
