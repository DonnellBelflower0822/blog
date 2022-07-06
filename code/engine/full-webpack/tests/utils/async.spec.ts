import { wait } from '../../src/assets/utils/index'

test('test async', async () => {
    const res = await wait(100)
    expect(res).toBe('ok')
})