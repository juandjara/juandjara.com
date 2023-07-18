export default function Social({ icon, link, label }: { icon: string, link: string, label: string }) {
  return (
    <div className="text-orange-500">
      <img alt="" style={{ display: 'inline-block', margin: '0 8px 0 4px' }} src={icon} />
      <a rel="me" href={link}>{label}</a>
    </div>
  )
}
