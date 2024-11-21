export default function Social({ icon, link, label }: { icon: string, link: string, label: string }) {
  return (
    <div className="text-orange-500">
      <img
        alt=""
        width="20"
        height="20"
        src={icon}
        style={{ display: 'inline-block', margin: '0 8px 0 4px' }}
      />
      <a rel="me" href={link}>{label}</a>
    </div>
  )
}
