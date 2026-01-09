document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.nav-links-mobile');
    const toggleIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                toggleIcon.classList.remove('ph-list');
                toggleIcon.classList.add('ph-x');
                document.body.style.overflow = 'hidden';
            } else {
                toggleIcon.classList.remove('ph-x');
                toggleIcon.classList.add('ph-list');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Active Link Highlighting ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .nav-links-mobile a, .footer-col ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            // For mobile menu, maybe add a different style or icon
        } else {
            // Check for home page edge case where href="index.html" but path is "" or "/"
            if ((currentPath === '' || currentPath === '/') && linkPath === 'index.html') {
                link.classList.add('active');
            }
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.glass-card, .pricing-card, .features-grid > div, .section-header, .hero-content, .hero-visual');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-up-element');
        // Add a small delay based on index for staggered effect in grids
        el.style.transitionDelay = `${index % 3 * 100}ms`;
        observer.observe(el);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Year Update ---
    document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

    // --- Details Toggle Icon Animation (if present) ---
    document.querySelectorAll('details').forEach((detail) => {
        detail.addEventListener('toggle', (e) => {
            const icon = detail.querySelector('summary i');
            if (!icon) return;
            if (detail.open) {
                icon.classList.remove('ph-caret-down');
                icon.classList.add('ph-caret-up');
            }
            else {
                icon.classList.remove('ph-caret-up');
                icon.classList.add('ph-caret-down');
            }
        });
    });

    // --- Contact Form Handling (if present) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const formMessage = document.getElementById('formMessage');

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    if (formMessage) {
                        formMessage.classList.add('success');
                        form.reset();
                        setTimeout(() => { formMessage.classList.remove('success'); }, 5000);
                    }
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            console.error('Form errors:', data.errors.map(error => error["message"]).join(", "));
                        } else {
                            console.error('Form error:', 'Oops! There was a problem submitting your form');
                        }
                    })
                }
            }).catch(error => {
                console.error('Form error:', 'Oops! There was a problem submitting your form');
            });
        });
    }
    // --- Scroll Progress Indicator ---
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.innerHTML = `
        <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" class="progress-bg"></circle>
            <circle cx="25" cy="25" r="20" class="progress-bar"></circle>
        </svg>
        <i class="ph-bold ph-arrow-up"></i>
    `;
    document.body.appendChild(scrollProgress);

    const progressBar = scrollProgress.querySelector('.progress-bar');
    const totalLength = progressBar.getTotalLength(); // approx 126

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        const drawLength = totalLength * scrollPercent;

        progressBar.style.strokeDashoffset = totalLength - drawLength;

        if (scrollTop > 100) {
            scrollProgress.classList.add('visible');
        } else {
            scrollProgress.classList.remove('visible');
        }
    });

    scrollProgress.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const heroText = document.querySelector('.hero-content h1 .text-gradient');
    if (heroText && heroText.textContent.trim() === 'DevOps') {
        const text = "DevOps";
        const speed = 150;
        let i = 0;
        heroText.textContent = '';
        heroText.classList.add('typing-cursor');

        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(() => {
                    heroText.classList.remove('typing-cursor');
                    startHeroRotation(); // Start rotation after typing
                }, 1000);
            }
        }
        setTimeout(typeWriter, 500);
    }

    function startHeroRotation() {
        const subtext = document.getElementById('hero-subtext');
        const headline = document.getElementById('hero-headline-dynamic');
        const codeCard = document.getElementById('hero-code-card');
        const codeContent = codeCard ? codeCard.querySelector('.code-content') : null;
        const filename = codeCard ? codeCard.querySelector('.code-filename') : null;

        if (!subtext || !codeCard || !codeContent || !headline) return;

        const content = [
            {
                // 1. Pipeline
                headline: "Build Automated Pipelines",
                text: "Master CI/CD. Build automated pipelines that test, secure, and deploy your code instantly.",
                file: "ci-cd-flow",
                html: `
                    <div class="pipeline-container">
                        <div class="pipeline-node active"><i class="ph-bold ph-code"></i></div>
                        <div class="pipeline-connector"></div>
                        <div class="pipeline-node stagger-1"><i class="ph-bold ph-test-tube"></i></div>
                        <div class="pipeline-connector"></div>
                        <div class="pipeline-node stagger-2"><i class="ph-bold ph-rocket-launch"></i></div>
                    </div>
                    <div style="text-align: center; margin-top: 2rem; color: var(--primary); font-family: monospace;">
                        <span style="color: #666;">Status:</span> Building...
                    </div>
                `
            },
            {
                // 2. Terraform
                headline: "Define Infrastructure as Code",
                text: "Automate everything. Provision infinite infrastructure with simple, declarative code.",
                file: "terraform init",
                html: `
                    <div class="terminal-ui">
                        <div class="terminal-line"><span style="color: #27C93F;">➜</span> <span style="color: #9CDCFE;">~</span> terraform apply -auto-approve</div>
                        <div class="terminal-line stagger-1">Initializing the backend...</div>
                        <div class="terminal-line stagger-2" style="color: #2EC4B6;">Plan: 14 to add, 0 to change, 0 to destroy.</div>
                        <div class="terminal-line stagger-3">aws_instance.web: Creating...</div>
                        <div class="progress-container">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                `
            },
            {
                // 3. Kubernetes
                headline: "Orchestrate Containers",
                text: "Orchestrate at scale. Manage thousands of containers with self-healing Kubernetes clusters.",
                file: "k8s-cluster-view",
                html: `
                    <div class="cluster-grid">
                        <div class="cluster-pod active"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div>
                        <div class="cluster-pod active"></div><div class="cluster-pod error"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div>
                        <div class="cluster-pod active"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div>
                        <div class="cluster-pod active"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div><div class="cluster-pod active"></div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: space-between; font-size: 0.8rem; color: #888;">
                        <span><i class="ph-fill ph-circle" style="color: #27C93F;"></i> Healthy: 15</span>
                        <span><i class="ph-fill ph-circle" style="color: #FF5F56;"></i> Restarting: 1</span>
                    </div>
                `
            },
            {
                // 4. Monitoring
                headline: "Gain Deep Observability",
                text: "Visualize metrics, logs, and traces in real-time. Never fly blind again.",
                file: "grafana-dash",
                html: `
                    <div class="dashboard-ui">
                        <div class="metric-box">
                            <div class="metric-title">Req / Sec</div>
                            <div class="metric-value" style="color: #2EC4B6;">1,420</div>
                             <div class="chart-bars">
                                <div class="chart-bar" style="animation-delay: 0s"></div>
                                <div class="chart-bar" style="animation-delay: 0.2s"></div>
                                <div class="chart-bar" style="animation-delay: 0.4s"></div>
                                <div class="chart-bar" style="animation-delay: 0.1s"></div>
                            </div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-title">Error Rate</div>
                            <div class="metric-value" style="color: #FF5F56;">0.01%</div>
                            <div class="chart-bars">
                                <div class="chart-bar" style="background: #FF5F56; height: 10%;"></div>
                                <div class="chart-bar" style="background: #333; height: 5%;"></div>
                                <div class="chart-bar" style="background: #333; height: 5%;"></div>
                                <div class="chart-bar" style="background: #333; height: 5%;"></div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                // 5. Security
                headline: "Integrate DevSecOps",
                text: "Ship secure code. Integrate automated security scanning into every commit.",
                file: "security-audit",
                html: `
                    <div class="security-ui">
                        <div class="security-item stagger-1">
                            <i class="ph-fill ph-shield-check" style="color: #27C93F; font-size: 1.5rem;"></i>
                            <div style="flex: 1;">
                                <div style="font-weight: 700; font-size: 0.9rem;">SAST Scan</div>
                                <div style="font-size: 0.8rem; color: #888;">No vulnerabilities found</div>
                            </div>
                            <span class="status-badge status-pass">Pass</span>
                        </div>
                        <div class="security-item stagger-2">
                             <i class="ph-fill ph-lock-key" style="color: #FFBD2E; font-size: 1.5rem;"></i>
                            <div style="flex: 1;">
                                <div style="font-weight: 700; font-size: 0.9rem;">Dependency Check</div>
                                <div style="font-size: 0.8rem; color: #888;">1 low severity issue</div>
                            </div>
                            <span class="status-badge status-scan">Warn</span>
                        </div>
                    </div>
                `
            }
        ];

        let index = 0;
        setInterval(() => {
            index = (index + 1) % content.length;
            const data = content[index];

            // Start Exit Animation
            subtext.classList.add('fade-out');
            headline.classList.add('fade-out');
            codeCard.classList.add('flipping');

            // Swap Content Halfway
            setTimeout(() => {
                subtext.textContent = data.text; // Use textContent for smoother render usually
                headline.textContent = data.headline;
                codeContent.innerHTML = data.html;
                if (filename) filename.textContent = data.file;

                // Start Enter Animation
                subtext.classList.remove('fade-out');
                headline.classList.remove('fade-out');
                codeCard.classList.remove('flipping');
            }, 600); // 600ms matches the CSS transition time

        }, 5000); // Rotate every 5 seconds
    }
});
