export function Footer() {
  return (
    <footer className="w-full py-6" style={{ backgroundColor: "rgb(24, 24, 24)" }}>
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
        <p>© 2025 sososmog. All rights reserved. Released under the MIT License.</p>
        <p className="mt-1">
          <a 
            href="https://github.com/sososmog/JudgeTheBeer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}