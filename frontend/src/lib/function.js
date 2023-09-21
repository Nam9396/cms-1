import { gql } from '@apollo/client'


const NewQuery = gql`
query NewQuery {
  posts(first: 10) {
    nodes {
      title(format: RENDERED)
      slug
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      seo {
        description
        focusKeywords
      }
      categories {
        nodes {
          name
          ancestors {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
`
export default NewQuery;