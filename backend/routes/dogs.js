import Dog from '../models/Dog.js';
import router from '../router.js';

router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find();
    return res.json({ status: 200, data: dogs });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const missingFields = Object.entries(data)
      .map(([key, value]) => {
        if (value.trim().length === 0) return key;
        return null;
      })
      .filter(Boolean);

    if (missingFields.length > 0) {
      return res.json({
        status: 400,
        message: `Some fields are empty: ${missingFields.join(',')}`,
      });
    }
    const newDog = await Dog.create(data);
    await newDog.save();
    return res.json({ status: 201, data: newDog.id });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Dog.findByIdAndRemove(req.params.id);
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
});

export default router;
