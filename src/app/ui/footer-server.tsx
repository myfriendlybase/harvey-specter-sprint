import { client } from '@/sanity/lib/client'
import Footer from './footer'

const QUERY = `*[_id == "siteSettings"][0]{ socialLinks }`

export default async function FooterServer() {
  const settings = await client.fetch(QUERY, {}, { next: { revalidate: 60 } })
  return <Footer socialLinks={settings?.socialLinks} />
}
