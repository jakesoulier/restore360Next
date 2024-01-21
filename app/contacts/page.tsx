import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const contactList = () => {
  return (
    <div><Button><Link href='/contacts/new'>New Contact</Link></Button></div>
  )
}

export default contactList