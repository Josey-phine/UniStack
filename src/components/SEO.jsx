import { Helmet } from 'react-helmet-async'

const siteName = 'UniStack'
const siteDescription =
  'Free academic tools for students, including CGPA, GPA, grade calculators, study planners, exam tools, and productivity timers.'

function SEO({
  title,
  description = siteDescription,
  breadcrumbs = [],
}) {
  const fullTitle = title
    ? `${title} | ${siteName}`
    : siteName

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        name="twitter:card"
        content="summary"
      />

      <meta
        name="twitter:title"
        content={fullTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

     <script type="application/ld+json">
  {JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description: description,
  })}
</script>

<script type="application/ld+json">
  {JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: fullTitle,
    description: description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
  })}
</script>

{breadcrumbs.length > 0 && (
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map(
        (breadcrumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.url,
        })
      ),
    })}
  </script>
)}

    </Helmet>
  )
}

export default SEO
