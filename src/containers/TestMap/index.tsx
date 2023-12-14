import { MapComponent, ImageUploadComponent } from "../../components";

const TestMap: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Location App</h1>
        <MapComponent />
        <ImageUploadComponent />
      </header>
    </div>
  );
};

export default TestMap