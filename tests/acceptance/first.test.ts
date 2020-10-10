import { Selector } from 'testcafe';

fixture('First test - Getting started').page('../../dist/index.html')

test('Should display a good old "Hello World"', async t => {
    await t.expect(Selector('h1').innerText).eql('Hello World')
})