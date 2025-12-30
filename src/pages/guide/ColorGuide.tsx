interface ColorBoxProps {
  label: string;
  className: string;
}

const ColorBox = ({ label, className }: ColorBoxProps) => {
  return (
    <div className={`flex h-24 items-center justify-center rounded-lg font-semibold ${className}`}>
      {label}
    </div>
  );
};

const ColorGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">🎨 Design System Color Guide</h1>

      {/* Brand colors */}
      <section className="mb-10 w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Brand Colors</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <ColorBox label="brand-primary" className="bg-brand-primary text-white" />
          <ColorBox label="brand-primarySoft" className="bg-brand-primarySoft text-brand-primary" />
          <ColorBox label="brand-green" className="bg-brand-green text-white" />
          <ColorBox label="brand-yellow" className="bg-brand-yellow text-gray-900" />
          <ColorBox label="brand-orange" className="bg-brand-orange text-white" />
        </div>
      </section>

      {/* Semantic colors */}
      <section className="mb-10 w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Semantic Colors</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <ColorBox label="error" className="bg-error text-white" />
        </div>
      </section>

      {/* Gray scale */}
      <section className="w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Gray Scale</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <ColorBox label="gray-50" className="border bg-gray-50 text-gray-900" />
          <ColorBox label="gray-100" className="bg-gray-100 text-gray-900" />
          <ColorBox label="gray-200" className="bg-gray-200 text-gray-900" />
          <ColorBox label="gray-600" className="bg-gray-600 text-white" />
          <ColorBox label="gray-900" className="bg-gray-900 text-white" />
          <ColorBox label="gray-950" className="bg-gray-950 text-white" />
        </div>
      </section>
    </div>
  );
};

export default ColorGuide;
