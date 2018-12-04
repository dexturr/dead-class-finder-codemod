export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  root
    .find(j.Program)
    .forEach((statement) => {
      const { value } = statement;
      const newBody = [
        j.importDeclaration([
          j.importDefaultSpecifier(
            j.identifier('registerCssClasses')
          )],
        j.literal('ember-cli-dead-class-finder/test-support')),
      ].concat(value.body);
      statement.replace(j.program(
        newBody
      ));
    });

  return root
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
              name: 'setupRenderingTest',
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
