import React from 'react'

export function Input(packet) {
  // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit]
  return (
    <p>
      <label htmlFor={packet[1].toLowerCase()}>{packet[1]}</label>
      <input
        type={packet[0]}
        name={packet[1].toLowerCase()}
        placeholder={packet[1]}
        value={packet[2]}
        onChange={packet[3]}
        required={packet[4]}
        maxLength={packet[5]}
      />
    </p>
  )
}
export function BigInput(packet) {
  // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit,
  // 6 = name, 7 = list of options]
  return (
    <p>
      <label htmlFor={packet[6]}>{packet[1]}</label>
      <input
        type={packet[0]}
        name={packet[6]}
        placeholder={packet[1]}
        value={packet[2]}
        onChange={packet[3]}
        required={packet[4]}
        maxLength={packet[5]}
      />
    </p>
  )
}

export function OptionsInput(packet) {
  // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit,
  // 6 = name, 7 = list of options values]
  return (
    <p>
      <label htmlFor={packet[6]}>{packet[1]}</label>
      <select name={packet[6]} value={packet[2]} onChange={packet[3]}>
        {packet[7].map((choice) => (
          <option value={choice.value}>{choice.name}</option>
        ))}
      </select>
    </p>
  )
}

export function ButtonInput(packet) {
  // packet [0 = type, 1 = Name, 2 = value,  3 = onChange, 4 = required, 5 = characterLimit,
  // 6 = name]
  return (
    <p>
      <span></span>
      <label htmlFor={packet[6]}>{packet[1]}</label>
      <input
        type={packet[0]}
        name={packet[6]}
        checked={packet[2]}
        onChange={packet[3]}
      />
      <span></span>
    </p>
  )
}
