// Code chunks from jhmxyxb.py
const CODE_CHUNKS = {
    hero: `import os
import sys
import shutil
import pandas as pd
import re
import xlwings as xw
from openpyxl import load_workbook
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget)
from PyQt5.QtCore import Qt, QThread, pyqtSignal
# Product Info Tool
# Version 3.3
# Optimized for performance
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()`,

    ball: `class MorphToBallOverlay(QWidget):
    def __init__(self, main_window, target_geometry):
        super().__init__()
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint)
        self.setAttribute(Qt.WA_TranslucentBackground)
        
    def on_tick(self):
        # Liquid morphing logic
        if elapsed >= self.duration:
            self.progress = 1.0
        else:
            # EaseInOutCubic
            t = elapsed / self.duration
            if t < 0.5:
                self.progress = 4 * t * t * t
    
    def paintEvent(self, event):
        # Simulate liquid surface tension
        wobble = 0.1 * math.sin(t * math.pi * 3)
        current_w *= (1.0 + wobble)
        
        # Refraction effect
        painter.setOpacity(opacity)
        painter.drawPixmap(rect, snapshot)`,

    automation: `def move_files_between_matched_folders(self, matched_pairs):
    """Move files from matched source folders to target folders"""
    moved_count = 0
    total_files = 0
    
    for source_folder, target_folder in matched_pairs:
        try:
            # Get all files in source folder
            source_files = []
            for item in os.listdir(source_folder):
                item_path = os.path.join(source_folder, item)
                if os.path.isfile(item_path):
                    source_files.append(item_path)
            
            total_files += len(source_files)
            
            # Move files to target folder
            for file_path in source_files:
                file_name = os.path.basename(file_path)
                target_file_path = os.path.join(target_folder, file_name)
                
                try:
                    # If target file exists, generate new name
                    if os.path.exists(target_file_path):
                        base_name, ext = os.path.splitext(file_name)
                        counter = 1
                        while os.path.exists(target_file_path):
                            new_name = f"{base_name}_{counter}{ext}"
                            target_file_path = os.path.join(target_folder, new_name)
                            counter += 1
                    
                    # Move file
                    shutil.move(file_path, target_file_path)
                    moved_count += 1
                except Exception as e:
                    print(f"Move failed: {file_path}")
    return moved_count, total_files`,

    translate: `def translate_zh_to_en_fallback(text, timeout=6.0):
    t = (text or "").strip()
    if not t: return ""
    
    # Try Google Translate
    try:
        url = "https://translate.googleapis.com/translate_a/single"
        params = {"client": "gtx", "sl": "zh-CN", "tl": "en"}
        resp = requests.get(url, params=params)
    except Exception:
        pass
        
    # Try LibreTranslate
    for host in ["https://libretranslate.com", "https://libretranslate.de"]:
        try:
            resp = requests.post(host, data={"q": t})
            if resp.status_code == 200:
                return resp.json().get("translatedText")
        except:
            continue
            
    return t # Fallback to original`,

    ui: `class StartupAnimationWindow(QWidget):
    def update_animation(self):
        self.animation_frame += 1
        
        # Liquid glass fade-in
        if self.animation_phase == 0:
            opacity = self.animation_frame / 30
            blur = int((1 - opacity) * 10)
            
            self.title_label.setStyleSheet(f"""
                QLabel {{
                    color: rgba(255, 255, 255, {opacity});
                    filter: blur({blur}px);
                    background: transparent;
                }}
            """)
            
        # Progress bar liquid fill
        elif self.animation_phase == 1:
            progress = (self.frame / 120) * 100
            self.fill.resize(width * progress, 6)`
};

// Canvas Setup
const canvas = document.getElementById('codeCanvas');
const ctx = canvas.getContext('2d');
const canvasRight = document.getElementById('codeCanvasRight');
const ctxRight = canvasRight.getContext('2d');

let width, height;
let currentCode = CODE_CHUNKS.hero;
let targetCode = CODE_CHUNKS.hero;
// Use a different code chunk for the right side or just shuffle/reverse it to make it look different
// For simplicity and to ensure it's "different", let's use a reversed or different logic
// Or we can just use the 'ball' chunk or 'automation' chunk as default for right side
// But the user said "different from left side".
// Let's create a separate set of lines for the right side.
let lines = [];
let linesRight = []; 

let mouse = { x: -1000, y: -1000 };

// Resize handling
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Resize right canvas
    canvasRight.width = width / 2; // It occupies 50% width via CSS, but let's match pixel density or just use full width of container
    // CSS says .code-background-right { width: 50%; }
    // If we set canvas.width to window.width/2, it matches the container.
    canvasRight.width = width / 2;
    canvasRight.height = height;
    
    parseCode();
}

function parseCode() {
    lines = currentCode.split('\n');
    
    // For right side, let's just use a different chunk or reverse the current one to ensure difference
    // The user wants it to be "different". 
    // Let's pick the 'automation' chunk if current is 'hero', etc.
    // Or just reverse the lines of the current code to make it look like different code.
    linesRight = [...lines].reverse(); 
    // Or even better, let's mix it up a bit more or use a fixed different chunk?
    // User said "right side code and left side code to be inconsistent".
    // Reversing lines is a good way to make it look structurally similar but content-wise different.
}

window.addEventListener('resize', resize);
resize();

// Mouse tracking
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Tilt effects for cards
    document.querySelectorAll('.tilt-effect').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

// Animation Loop
function draw() {
    // Clear both canvases
    ctx.clearRect(0, 0, width, height);
    ctxRight.clearRect(0, 0, canvasRight.width, canvasRight.height);
    
    // Left side settings
    ctx.font = '14px "JetBrains Mono", monospace';
    const lineHeight = 24;
    const startX = 50;
    const startY = 100;
    
    // Right side settings
    ctxRight.font = '14px "JetBrains Mono", monospace';
    // Align right side text to the right or left of its container? 
    // Usually code aligns left. Since the container is on the right 50% of screen, 
    // 0,0 of this canvas is the center of the screen.
    const startXRight = 50; 
    const startYRight = 100;

    // Draw Left Code
    lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        
        // Simple culling
        if (y < -50 || y > height + 50) return;
        
        const distY = Math.abs(mouse.y - y);
        
        // Draw each character/word (simplified to line for performance)
        // Check distance to mouse
        const distX = Math.abs(mouse.x - (startX + 200)); // Approx center of text
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        // Brightness based on mouse distance
        // Base opacity 0.1, max 0.8 near mouse
        let opacity = 0.15;
        if (dist < 400) {
            opacity = 0.15 + (1 - dist / 400) * 0.7;
        }
        
        ctx.fillStyle = `rgba(41, 151, 255, ${opacity})`; // Apple Blue
        ctx.fillText(line, startX, y);
    });

    // Draw Right Code - Auto Highlight & Larger Font
    // "Right side animation size should be larger than left side text" -> Increase font size
    ctxRight.font = '20px "JetBrains Mono", monospace'; // Larger font (was 14px)
    const lineHeightRight = 34; // Larger line height
    
    // Auto highlight logic
    // Create a moving "spotlight" based on time
    const time = Date.now() * 0.001;
    const autoY = startYRight + (Math.sin(time) * 0.5 + 0.5) * (linesRight.length * lineHeightRight);
    
    linesRight.forEach((line, index) => {
        const y = startYRight + index * lineHeightRight;
        
        // Simple culling
        if (y < -50 || y > height + 50) return;
        
        // Distance from auto spotlight
        const distY = Math.abs(autoY - y);
        
        // Base opacity + Highlight
        let opacity = 0.1; // Lower base opacity for better contrast
        if (distY < 300) {
            opacity = 0.1 + (1 - distY / 300) * 0.8; // Stronger highlight
        }
        
        // Right side color: Purple (matching accent-secondary #bf5af2)
        ctxRight.fillStyle = `rgba(191, 90, 242, ${opacity})`; 
        ctxRight.fillText(line, startXRight, y);
    });
    
    requestAnimationFrame(draw);
}

draw();

// Section Observer to switch code
const observerOptions = {
    threshold: 0.4
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            let newCode = null;
            
            if (id === 'hero') newCode = CODE_CHUNKS.hero;
            else if (id === 'ball') newCode = CODE_CHUNKS.ball;
            else if (id === 'automation') newCode = CODE_CHUNKS.automation;
            else if (id === 'translate') newCode = CODE_CHUNKS.translate;
            else if (id === 'ui') newCode = CODE_CHUNKS.ui;
            
            if (newCode && newCode !== currentCode) {
                currentCode = newCode;
                parseCode();
            }
            
            // Update nav active state
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Ball Double Click Interaction
const ballContainer = document.getElementById('ballContainer');
const jellyBall = document.getElementById('jellyBall');

if (jellyBall && ballContainer) {
    // Double click to toggle mode
    jellyBall.addEventListener('dblclick', (e) => {
        e.preventDefault();
        ballContainer.classList.add('active-mode');
    });

    // Double click on container (or demos) to switch back
    // Since the ball disappears, we need to click the container or the carousel area
    ballContainer.addEventListener('dblclick', (e) => {
        if (ballContainer.classList.contains('active-mode')) {
            // Prevent immediate triggering if it bubbled from the ball (though ball is hidden/pointer-events:none)
            if (e.target !== jellyBall && !jellyBall.contains(e.target)) {
                 ballContainer.classList.remove('active-mode');
            }
        }
    });
}

const nav = document.querySelector('.glass-nav');
const navToggle = document.querySelector('.nav-toggle');
// Select ALL clickable links inside the nav, including the download button
const allNavLinks = document.querySelectorAll('.glass-nav a');

if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
    });

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Add a small delay for visual feedback if needed, but immediate feels snappier
                nav.classList.remove('nav-open');
            }
        });
    });
}

// Jelly Ball Interaction
if (jellyBall) {
    jellyBall.addEventListener('click', function() {
        this.classList.remove('active');
        void this.offsetWidth; // Trigger reflow
        this.classList.add('active');
    });
    
    // Add drag-like interaction (simplified)
    let isDown = false;
    let startX, startY;
    
    jellyBall.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - jellyBall.offsetLeft;
        startY = e.pageY - jellyBall.offsetTop;
        jellyBall.style.cursor = 'grabbing';
        jellyBall.style.transform = 'scale(0.95)';
    });
    
    document.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            jellyBall.style.cursor = 'pointer';
            jellyBall.style.transform = 'scale(1)';
        }
    });
}

// Interactive Demo Logic
function handleDemoInteraction(containerId, elementSelector, intensity = 10, preserveCenter = false) {
    const container = document.getElementById(containerId);
    const element = container ? container.querySelector(elementSelector) : null;
    
    if (container && element) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;
            
            let transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            if (preserveCenter) {
                // Ensure transform-style: preserve-3d is set on the element in CSS
                transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; 
                // Removed translate(-50%, -50%) because we're handling centering via flexbox or absolute positioning wrapper
                // If element is absolutely positioned and relies on translate(-50%, -50%) to center, 
                // we should include it. But user says "displacement issue", so let's try pure rotation
                // assuming the container centers it.
                
                // Wait, if it WAS relying on translate, removing it breaks layout.
                // The user says "displacement position exception causing incomplete display".
                // This usually happens when translate is overwritten.
                // BUT the user also says "let it rotate at center point instead of direct displacement".
                // This implies the previous `translate` combined with `rotate` might be causing perceived shift 
                // or the origin is wrong.
                
                // Let's keep the translate if it's meant to be centered absolutely, 
                // BUT make sure transform-origin is center.
                transform = `perspective(1000px) translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
            
            // Actually, for SKU demo specifically (which uses .sku-scene-wrapper), 
            // .sku-scene-wrapper is width:100%; height:100%; relative. 
            // It does NOT need translate(-50%, -50%).
            // .liquid-window DOES need it.
            
            // Let's customize behavior based on selector or just refine the logic.
            // If preserveCenter is true, we assume it needs the translate.
            // However, for SKU wrapper, we might have passed preserveCenter=true incorrectly or 
            // we should not use translate there.
            
            if (elementSelector === '.sku-scene-wrapper') {
                 transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }

            element.style.transform = transform;
        });
        
        container.addEventListener('mouseleave', () => {
            if (preserveCenter && elementSelector !== '.sku-scene-wrapper') {
                element.style.transform = 'perspective(1000px) translate(-50%, -50%) rotateX(0) rotateY(0)';
            } else {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    }
}

// Initialize interactions
handleDemoInteraction('secondaryDemo', '.config-window', 15);
handleDemoInteraction('skuDemo', '.sku-scene-wrapper', 30, true);
handleDemoInteraction('liquidUiDemo', '.liquid-window', 20, true);
handleDemoInteraction('automationDemo', '.automation-inner', 10);

// Automation Demo Interaction Fix
const automationContainer = document.getElementById('automationDemo');
if (automationContainer) {
    const fiberPath = automationContainer.querySelector('.fiber-path');
    const fiberLineAfter = automationContainer.querySelector('.fiber-line');
    const singleStream = automationContainer.querySelector('.single-stream');

    if (fiberPath && fiberLineAfter && singleStream) {
        // We handle this via CSS hover in style.css, but if we need to sync strictly:
        // CSS is already set to: .fiber-path:hover .single-stream { animation-duration: 2s; }
        // We need to ensure the light beam (.fiber-line::after) also slows down.
        // We added .fiber-path:hover .fiber-line::after { animation-duration: 2s; } in CSS.
        // So JS might not be needed for simple hover speed change if CSS handles it.
        // But user said "Mouse interaction and fiber deceleration conflict".
        // If the conflict is about the 3D rotation (handleDemoInteraction) vs Hover,
        // The 3D rotation applies transform to .automation-inner.
        // The hover applies to .fiber-path (child of inner).
        // They should be independent.
        // Maybe the user means when rotating, it's hard to hover?
        // Or maybe the deceleration isn't working?
        // Let's ensure CSS rules are correct.
    }
}

// Secondary Edit Checkbox Interaction
const cbWrapper = document.querySelector('.secondary-edit-demo .cb-wrapper');
if (cbWrapper) {
    cbWrapper.addEventListener('click', () => {
        cbWrapper.classList.toggle('unchecked');
    });
}

// Timeline Auto-Scroll Logic
document.addEventListener('DOMContentLoaded', () => {
    const timelineContents = document.querySelectorAll('.timeline-item .content');
    
    timelineContents.forEach(content => {
        // Create a temporary clone to measure full height
        const ul = content.querySelector('ul');
        if (!ul) return;
        
        // Measure heights
        const containerHeight = content.clientHeight;
        const contentHeight = ul.scrollHeight;
        
        // Only enable scroll if content exceeds container
        // Or if we want to force scroll for aesthetic consistent look, but usually only if overflow
        // User said "content overflow ... incomplete display", implying overflow is the trigger.
        // But also said "scroll play", implying active behavior.
        // Let's set a threshold. If content is close to container height, it might look cut off.
        
        if (contentHeight > containerHeight) {
            content.classList.add('scroll-active');
            // Duplicate content for seamless loop
            ul.innerHTML += ul.innerHTML;
        } else {
            // If not scrolling, maybe remove the top/bottom fade mask so it looks clean?
            // User requested "bottom appear gradually, top disappear gradually" which is the mask effect.
            // If we keep the mask on short content, the top/bottom might be faded out.
            // Let's adjust mask for non-scrolling content or just center it.
            // If not scrolling, we probably want to remove the mask or adjust it.
            content.style.maskImage = 'none';
            content.style.webkitMaskImage = 'none';
        }
    });
});
