interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper(props: ContentWrapperProps) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center text-center mt-10">
      {props.children}
    </div>
  );
}
