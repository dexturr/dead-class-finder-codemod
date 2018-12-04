// Press ctrl+space for code completion
export default function transformer(file, api) {
    const j = api.jscodeshift;
  
    return j(file.source)
      .find(j.BlockStatement, {
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              arguments: [{
                type: 'Identifier',
                name: 'hooks',
              }],
              callee: {
                type: 'Identifier',
                name: 'setupApplicationTest',
              },
            },
          },
        ],
      })
      .forEach((statement) => {
        const { value } = statement;
        const newbody = value
          .body
          .concat(j.expressionStatement(
            j.callExpression(
              j.identifier(
                'registerCssClasses'
              ),
              [
                j.identifier(
                  'hooks'
                ),
              ]
            )
          ));
        const newStatmenet = j.blockStatement(newbody);
        statement.replace(newStatmenet);
      })
      .toSource();
  }