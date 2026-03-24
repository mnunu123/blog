// MDX 강조 박스 컴포넌트 — info | warning | tip | insight
interface Props {
  type?: 'info' | 'warning' | 'tip' | 'insight'
  children: React.ReactNode
}

const styles = {
  info:    { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'ℹ️',  text: 'text-blue-800' },
  warning: { bg: 'bg-amber-50',  border: 'border-amber-200',  icon: '⚠️', text: 'text-amber-800' },
  tip:     { bg: 'bg-green-50',  border: 'border-green-200',  icon: '💡', text: 'text-green-800' },
  insight: { bg: 'bg-purple-50', border: 'border-purple-200', icon: '🔍', text: 'text-purple-800' },
}

export default function Callout({ type = 'info', children }: Props) {
  const s = styles[type] ?? styles['info']
  return (
    <div className={`${s.bg} ${s.border} border rounded-lg p-4 my-6 flex gap-3`}>
      <span className="text-lg flex-shrink-0">{s.icon}</span>
      <div className={`${s.text} text-sm leading-relaxed`}>{children}</div>
    </div>
  )
}
