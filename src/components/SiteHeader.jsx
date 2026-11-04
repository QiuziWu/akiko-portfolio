export default function SiteHeader({ isAbout = false }) {
  const name = <>qiuzi wu <span className="name-chinese" lang="zh-Hans">秋子</span></>

  return (
    <header className="site-header">
      <span className="wordmark">
        {isAbout ? <a href="/">{name}</a> : name}
      </span>

      <nav className="site-nav" aria-label="Primary navigation">
        <ul>
          <li><a href={isAbout ? '/#projects' : '#projects'}>projects</a></li>
          <li><a href="/about/" aria-current={isAbout ? 'page' : undefined}>about</a></li>
          <li><span aria-disabled="true">contact</span></li>
        </ul>
      </nav>
    </header>
  )
}
