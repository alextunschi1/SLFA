import React from "react";

/**
 * Renders a component to display a "Not Authorized" message.
 * @returns JSX.Element
 */
export default function NotAuthorized() {
  return (
    <div className="flex-1 bg-white flex justify-center items-center">
      <p className="text-4xl text-red-600 font-bold">Not Authorized</p>
    </div>
  );
}
