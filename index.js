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
          .slice(0, 1)
          .concat(
            j.expressionStatement(
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
            ))
          .concat(value.body.slice(1));
        const newStatmenet = j.blockStatement(newbody);
        statement.replace(newStatmenet);
      })
      .toSource();
  }
  