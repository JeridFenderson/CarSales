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
  // 6 = name, 7 = list of options, 8 = min, 9 = max, 10 = step, 11 = className, 12 = key]
  return (
    <p className={packet[11]} key={packet[12]}>
      <label htmlFor={packet[6]}>{packet[1]}</label>
      <input
        type={packet[0]}
        name={packet[6]}
        placeholder={packet[1]}
        value={packet[2]}
        onChange={packet[3]}
        required={packet[4]}
        maxLength={packet[5]}
        min={packet[8]}
        max={packet[9]}
        step={packet[10]}
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

export const supportedFeatures = [
  { value: 'ABS', type: 'abs_brakes' },
  { value: 'Adaptive Cruise Control', type: 'adaptive_cruise_control' },
  { value: 'Air Conditioning', type: 'air_conditioning' },
  { value: 'Alarm', type: 'alarm' },
  { value: 'Alloy Wheels', type: 'alloy_wheels' },
  { value: 'Armored', type: 'armored' },
  { value: 'Aux Audio Input', type: 'aux_audio_input' },
  { value: 'Backup Camera', type: 'backup_camera' },
  { value: 'Blind Spot Alert', type: 'blind_spot_alert' },
  { value: 'Bluetooth', type: 'bluetooth' },
  { value: 'Collision Avoidance', type: 'collision_avoidance' },
  { value: 'Cruise Control', type: 'cruise_control' },
  { value: 'Daytime Running Lights', type: 'daytime_running_lights' },
  { value: 'DVD Player', type: 'dvd_player' },
  { value: 'Fog Lights', type: 'fog_lights' },
  { value: 'HD Radio', type: 'hd_radio' },
  { value: 'Heated Seats', type: 'heated_seats' },
  { value: 'Heated Steering Wheel', type: 'heated_steering_wheel' },
  { value: 'HID Headlights', type: 'hid_headlights' },
  { value: 'Hill-Start Assist', type: 'hill_start_assist' },
  { value: 'Keyless Entry', type: 'keyless_entry' },
  { value: 'Keyless Start', type: 'keyless_start' },
  { value: 'Lane-Keep Assist', type: 'lane_keep_assist' },
  { value: 'Leather', type: 'leather' },
  { value: 'LED Headlights', type: 'led_headlights' },
  { value: 'Moon Roof', type: 'moon_roof' },
  { value: 'MP3', type: 'mp3' },
  { value: 'Navigation', type: 'navigation' },
  { value: 'Night View', type: 'night_view' },
  { value: 'Panorama Roof', type: 'panorama_roof' },
  { value: 'Park Assist', type: 'park_assist' },
  { value: 'Power Door Locks', type: 'power_door_locks' },
  { value: 'Power Liftgate', type: 'power_liftgate' },
  { value: 'Power Seats', type: 'power_seats' },
  { value: 'Power Steering', type: 'power_steering' },
  { value: 'Power Windows', type: 'power_windows' },
  { value: 'Privacy Glass', type: 'privacy_glass' },
  { value: 'Rear Spoiler', type: 'rear_spoiler' },
  { value: 'Remote Start', type: 'remote_start' },
  { value: 'Roof Rack', type: 'roof_rack' },
  { value: 'Running Boards', type: 'running_boards' },
  { value: 'Satellite Radio', type: 'satellite_radio' },
  { value: 'Stability Control', type: 'stability_control' },
  { value: 'Surround View Camera', type: 'surround_view_camera' },
  { value: 'Telematics', type: 'telematics' },
  { value: 'Third Row Seat', type: 'third_row_seat' },
  { value: 'Tilt Steering Wheel', type: 'tilt_steering_wheel' },
  { value: 'Tinted Windows', type: 'tinted_windows' },
  { value: 'Tire Pressure Monitor', type: 'tire_pressure_monitor' },
  { value: 'Tow Package', type: 'tow_package' },
  { value: 'Traction Control', type: 'traction_control' },
  { value: 'Ventilated Seats', type: 'ventilated_seats' },
]
