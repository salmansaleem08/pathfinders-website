// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    window.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });

    menu.querySelectorAll('a, button').forEach(item => {
        item.addEventListener('click', () => menu.classList.add('hidden'));
    });
});

// Accordion Toggle
function toggleAccordion(element) {
    const allContents = document.querySelectorAll('.accordion-content');
    const allHeaders = document.querySelectorAll('.accordion-header');
    const allIcons = document.querySelectorAll('.toggle-icon');
    const content = element.querySelector('.accordion-content');
    const header = element.querySelector('.accordion-header');
    const toggleIcon = element.querySelector('.toggle-icon');

    allContents.forEach((c) => c !== content && (c.style.maxHeight = null));
    allHeaders.forEach((h) => h !== header && h.classList.replace('bg-[#143466]', 'bg-white') && h.classList.replace('text-white', 'text-[#143466]'));
    allIcons.forEach((icon) => icon !== toggleIcon && (icon.textContent = '+'));

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        toggleIcon.textContent = '+';
        header.classList.replace('bg-[#143466]', 'bg-white');
        header.classList.replace('text-white', 'text-[#143466]');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        toggleIcon.textContent = '-';
        header.classList.replace('bg-white', 'bg-[#143466]');
        header.classList.replace('text-[#143466]', 'text-white');
    }
}

// "What We Offer" Section Animation
document.addEventListener("DOMContentLoaded", function () {
    const items = [
        { text: "Advanced Teaching Methods", icon: "icons/presentation.gif" },
        { text: "Individual Attention", icon: "icons/individual attention.gif" },
        { text: "Modern Classrooms", icon: "icons/modern classroom.gif" },
        { text: "Flexible Hours", icon: "icons/flexible hours.gif" },
        { text: "Study Material", icon: "icons/study material.gif" },
        { text: "Expert Faculty", icon: "icons/expert faculty.gif" },
        { text: "Mock Tests", icon: "icons/mock test.gif" },
        { text: "IELTS Mock Tests", icon: "icons/ielts mock.gif" },
    ];

    const container = document.getElementById("animated-section");

    function renderBoxes() {
        container.innerHTML = `
            <div class="white-boxes flex overflow-hidden w-full gap-6 relative">
                ${items.slice(0, 4).map(item => `
                    <div class="white-box bg-white rounded p-8 mt-6 shadow-lg flex flex-col items-center justify-center text-center transition-transform duration-500 w-[24%] h-[200px]">
                        <img src="${item.icon}" alt="${item.text}" class="w-16 h-16 mb-3 object-contain">
                        <p class="text-lg font-semibold text-gray-700">${item.text}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function updateBoxes() {
        const boxes = document.querySelectorAll(".white-box");
        boxes.forEach((box) => box.style.transform = "translateX(-110%)");

        setTimeout(() => {
            items.push(items.shift());
            renderBoxes();
        }, 500);
    }

    renderBoxes();
    setInterval(updateBoxes, 3000);
});

// Pie Chart Animation
function animatePieCharts() {
    document.querySelectorAll(".pie-chart").forEach((chart) => {
        let circle = chart.querySelector("circle:nth-child(2)");
        let text = chart.querySelector("text");
        let percentage = parseInt(circle.getAttribute("data-percentage"));
        let currentPercentage = 0;
        let animationDuration = 2000;
        let frameRate = 10;
        let totalFrames = animationDuration / frameRate;
        let step = percentage / totalFrames;

        function updateAnimation() {
            if (currentPercentage >= percentage) {
                text.textContent = `${percentage}%`;
                circle.style.strokeDasharray = `${percentage}, 95`;
                return;
            }
            currentPercentage += step;
            text.textContent = `${Math.round(currentPercentage)}%`;
            circle.style.strokeDasharray = `${currentPercentage}, 100`;
            setTimeout(updateAnimation, frameRate);
        }

        updateAnimation();
    });
}

// Observe Pie Chart Section
function observeSection() {
    let section = document.querySelector(".our-experience-section");
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animatePieCharts();
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", observeSection);

// Testimonials Rotation
document.addEventListener("DOMContentLoaded", function () {
    let testimonials = document.querySelector("#testimonial-container");

    function rotateTestimonials() {
        testimonials.style.transform = "translateX(-100%)";
        setTimeout(() => {
            testimonials.appendChild(testimonials.firstElementChild);
            testimonials.style.transition = "none";
            testimonials.style.transform = "translateX(0)";
            setTimeout(() => testimonials.style.transition = "transform 0.7s ease-in-out", 100);
        }, 700);
    }

    setInterval(rotateTestimonials, 3000);
});

// Counter Animation in services page
document.addEventListener("DOMContentLoaded", function () {
    let counters = document.querySelectorAll(".counter");
    let speed = 50; // Lower value means faster animation

    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let target = +entry.target.getAttribute("data-target");
                    let count = 0;

                    let updateCount = () => {
                        let increment = Math.ceil(target / speed);
                        count += increment;
                        if (count > target) {
                            count = target;
                        }
                        entry.target.innerText = count;

                        if (count < target) {
                            setTimeout(updateCount, 50);
                        }
                    };

                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% visible
    );

    counters.forEach(counter => observer.observe(counter));
});

