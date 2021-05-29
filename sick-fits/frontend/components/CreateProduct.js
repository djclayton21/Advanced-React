import useForm from '../lib/useForm';

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'shoes',
    price: 252346,
    description: 'they go on your feet',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        price
        <input
          type="number"
          id="price"
          name="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        description
        <input
          type="text"
          id="description"
          name="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={clearForm}>
        Clear
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
}

export default CreateProduct;
