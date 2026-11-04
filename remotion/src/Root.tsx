import { Composition } from "remotion";
import { HeartStorm } from "./HeartStorm";
import { IconMark, OgCard } from "./OgCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vertical: pensado mobile-first, sirve igual para historias */}
      <Composition
        id="HeartStorm"
        component={HeartStorm}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ nombre: "Isa", firma: "Philipao" }}
      />
      {/* Cuadrada: para el escenario del corazón en escritorio */}
      <Composition
        id="HeartStormSquare"
        component={HeartStorm}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ nombre: "Isa", firma: "Philipao" }}
      />
      {/* Tarjeta social y marca para los iconos */}
      <Composition id="OgCard" component={OgCard} durationInFrames={1} fps={30} width={1200} height={630} />
      <Composition id="IconMark" component={IconMark} durationInFrames={1} fps={30} width={512} height={512} />
    </>
  );
};
