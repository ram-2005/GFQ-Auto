console.log("Form AI Assistant loaded");

const formItems = document.querySelectorAll('[role="listitem"]');

console.log(`Detected ${formItems.length} form items`);

formItems.forEach((item, index) => {
    console.log(`--- Form item ${index + 1} ---`);
    console.log(item.innerText);
});
