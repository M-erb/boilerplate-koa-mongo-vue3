module.exports = pollen => {
  return {
    output: './src/styles/pollen.css',
    modules: {
      color: { white: '#ffffff', ...pollen.color },
      radius: { ...pollen.radius, xxl: '18px' },
      size: {
        ...pollen.size,
        '-1': '-4px',
        '-2': '-8px',
        '-3': '-12px',
        '-4': '-16px',
        '-5': '-20px',
        '-6': '-24px',
        '-px': '-1px'
      }
    }
  }
}
