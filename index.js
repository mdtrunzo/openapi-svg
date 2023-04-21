const input = document.getElementById('input')
const button = document.getElementById('button')
const output = document.getElementById('output')
let resultSVG

const apiKey = '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'

const fetchData = async () => {
  output.innerHTML = `<img src="./spinner.gif" alt="loader" width="50" height="50"/>`

  try {
    const inputVal = input.value

    if (inputVal) {
      const params = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: inputVal }],
      }

      await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => (output.innerHTML = data.choices[0].message.content))
        .then(() => (resultSVG = output.getElementsByTagName('svg')[0]))
        .catch((err) => console.log(err))
    }

    if (resultSVG) {
      console.log('result: ', resultSVG)
    }
  } catch (error) {
    console.log(err)
  }
}

button.addEventListener('click', fetchData)
