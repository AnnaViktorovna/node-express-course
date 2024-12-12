let people = [];

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    people.push({ id: people.length + 1, name });
    res.status(201).send({ success: true, person: name });
};

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });
    res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));
    if (!person) {
        return res
            .status(404)
            .json({
                success: false,
                msg: `no person with id ${req.params.id}`,
            });
    }
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    );
    people = newPeople;

    return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
};
