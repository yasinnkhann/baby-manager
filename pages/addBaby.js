import { useState } from 'react';

export default function AddBaby() {
  const [weight, setWeight] = useState(null);

  return (
    <main>
      <h1>Add A Baby</h1>
      <form>
        <input type='text' name='name' id='name' placeholder='name' required></input>
        <label htmlFor='birthday'>Birthday</label>
        <input type='date' id='birthday' name='baby-birthday' required></input>
        <button>♂</button>
        <button>♀</button>
        <label htmlFor='weight'>Weight</label>
        <input
          type='range'
          id='weight'
          name='baby-weight'
          min='0'
          max='25'
          step='.10'
          onChange={e => setWeight(e.target.value)}
        ></input>
        <p>{`${weight}`}</p>
        <select name='weight-type' id='weight-type-select'>
          <option value=''>--options--</option>
          <option value='lb'>lb</option>
          <option value='kg'>kg</option>
        </select>
      </form>
    </main>
  );
}
