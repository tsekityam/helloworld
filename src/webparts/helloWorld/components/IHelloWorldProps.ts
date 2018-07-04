export interface IHelloWorldProps {
  origin: string;
  destination: string;
  departing: Date;
  returning: Date;
  onSubmitPackage: (origin: string, destination: string, departing: Date, returning: Date) => void;
}
