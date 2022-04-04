function sum(a, b) {
    return a + b
}

test('10 + 20 应该等于30？', () => {
    const total = sum(10, 20)
    expect(total).toBe(30)
})
