const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage.js')
    resolve(
      graphql(
        `
          {
            allMoltinProduct {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allMoltinProduct.edges.forEach(edge => {
          createPage({
            path: `/product/${edge.node.id}/`,
            component: productPageTemplate,
            context: {
              id: edge.node.id,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({stage, plugins, actions}) => {
  actions.setWebpackConfig({
    node: {fs: 'empty'},
  })

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          window: undefined,
          XMLHttpRequest: undefined,
        }),
      ],
    })
  }
}
