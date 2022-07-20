import { ReactNode } from "react";

import * as PropTypes from 'prop-types'

import "./loading-zone.scss";

interface LoadingZoneInterface {
    isLoading: boolean | (() => boolean);
    children: ReactNode;
}

export default function LoadingZone({ children = null, isLoading = true } : LoadingZoneInterface) {
  const loading = typeof isLoading === "function" ? isLoading() : !!isLoading;

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          padding: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loading-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
  return children;
}

LoadingZone.propTypes = {
  isLoading: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  children: PropTypes.node,
};

LoadingZone.defaultProps = {
  children: null,
};
