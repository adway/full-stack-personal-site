import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  value,
  label,
  error,
  onChange,
  disabled
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          className={classnames('textarea', {
            'is-danger': error
          })}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
          id="code"
          rows="20"
        />
      </div>

      {error && <div className="help is-danger">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

export default TextAreaFieldGroup;
