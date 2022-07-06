import renderer from 'react-test-renderer'
import App from '../src/App'

it('test react component', () => {
    const component = renderer.create(
        <App />
    )
})
