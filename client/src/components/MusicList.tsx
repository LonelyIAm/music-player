import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { MusicItem } from ".";
import { useMusic } from "../context/MusicContext";

const MusicList = () => {
  const { music } = useMusic()!;
  const { url, path } = useRouteMatch();
  console.log(`${url}/test`);
  return (
    <>
      <Link to={url}>home</Link>
      <Link to={`${url}/test`}>test</Link>
      <Switch>
        <Route path={path} exact>
          <ul>
            {music.map((item) => (
              <MusicItem key={item.id} {...item} />
            ))}
          </ul>
        </Route>
        <Route path={`/test`}>
          <h1>Test</h1>
        </Route>
      </Switch>
    </>
  );
};

export default MusicList;
