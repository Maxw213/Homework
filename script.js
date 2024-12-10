async function fetchHomework() {
    try {
        const response = await fetch('API_URL_TO_FETCH_HOMEWORK', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YOUR_API_TOKEN' // Use if necessary
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const homeworkData = await response.json();
        return homeworkData;

    } catch (error) {
        console.error('Error fetching homework:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const homeworkData = await fetchHomework();
    const homeworkList = document.getElementById('homework');

    // Ensure homeworkData is an array before iterating
    if (Array.isArray(homeworkData)) {
        homeworkData.forEach(displayHomework);
    } else {
        displayNoHomework();
    }

    const homeworkForm = document.getElementById('homework-form');
    homeworkForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form submission

        const subject = document.getElementById('subject').value;
        const assignment = document.getElementById('assignment').value;
        const dueDate = document.getElementById('dueDate').value;

        // Display the new homework item
        const newHomework = { subject, assignment, dueDate };
        displayHomework(newHomework);

        // Clear form fields
        homeworkForm.reset();
    });
});

function displayHomework(homework) {
    const homeworkList = document.getElementById('homework');
    const listItem = document.createElement('li');
    
    // Create a span to hold homework text
    const homeworkText = document.createElement('span');
    homeworkText.textContent = `${homework.subject}: ${homework.assignment} due on ${homework.dueDate}`;
    listItem.appendChild(homeworkText);

    // Button to mark as done
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Mark as Done';
    doneButton.onclick = () => {
        homeworkText.style.textDecoration = "line-through"; // Strike through text
        doneButton.disabled = true; // Disable button after marking
    };
    listItem.appendChild(doneButton);

    // Button to remove homework
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
        homeworkList.removeChild(listItem); // Remove the homework item from the list
    };
    listItem.appendChild(removeButton);

    homeworkList.appendChild(listItem);
}

function displayNoHomework() {
    const homeworkList = document.getElementById('homework');
    const listItem = document.createElement('li');
    listItem.textContent = 'No homework assignments available.';
    homeworkList.appendChild(listItem);
}