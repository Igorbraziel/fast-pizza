function MainContent({ children }) {
  return (
    <div className="overflow-scroll">
      <main className="mx-auto max-w-3xl px-5">{children}</main>
    </div>
  );
}

export default MainContent;
