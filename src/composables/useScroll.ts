import { ref, onMounted, onUnmounted } from "vue";

export function useScroll() {
    const lastId = ref("");
    const topMenuHeight = ref(60); // Adjust based on your navbar height
    const sections = ref<string[]>([]);

    onMounted(() => {
        document.querySelectorAll("#navbar-nav li a").forEach((el) => {
            const href = el.getAttribute("href");
            if (href) sections.value.push(href.replace("#", ""));
        });

        window.addEventListener("scroll", updateActiveSection);
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", updateActiveSection);
    });

    function updateActiveSection() {
        const fromTop = window.scrollY + topMenuHeight.value;

        let currentId = "";
        for (const id of sections.value) {
            const section = document.getElementById(id);
            if (section && section.offsetTop < fromTop) {
                currentId = id;
            }
        }

        lastId.value = currentId;
        updateNav(currentId);
    }

    function updateNav(id: string) {
        document.querySelectorAll("#navbar-nav li").forEach((el) => {
            el.classList.remove("active-nav");
        });

        const activeItem = document.querySelector(`#navbar-nav li a[href="#${id}"]`);
        if (activeItem) {
            activeItem.parentElement?.classList.add("active-nav");
        }
    }

    return { lastId };
}