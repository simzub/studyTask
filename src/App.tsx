import ContentWrapper from './components/ContentWrapper';
import InputContainer from './components/InputContainer';
import OutputContainer from './components/OutputContainer';
import ResultContainer from './components/ResultContainer';

export default function App() {
  return (
    <ContentWrapper>
      <InputContainer />
      <ResultContainer />
      <OutputContainer />
    </ContentWrapper>
  );
}
