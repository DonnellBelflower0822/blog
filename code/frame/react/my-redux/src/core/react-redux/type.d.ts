import React from "react";

type MapStateToProps<T, STATE> = (state: STATE) => T
type MapDispatchToProps = (() => {}) | Record<string, () => void>

export type Connect<T, D, STATE> = (
    mapStateToProps: MapStateToProps<T, STATE>,
    mapDispatchToProps?: MapDispatchToProps
) => ((Comp: React.ClassicComponent | React.FunctionComponent) => React.ClassicComponent | React.FunctionComponent)