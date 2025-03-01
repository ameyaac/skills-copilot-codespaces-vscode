function skillsMember() {
    var member = {
        name: 'John Doe',
        skills: ['JavaScript', 'React', 'Angular'],
        age: 25
    };

    // Access the member object
    console.log('Name:', member.name);
    console.log('Skills:', member.skills);
    console.log('Age:', member.age);

    // Loop through the skills array
    member.skills.forEach(function(skill) {
        console.log(skill);
    });
}