import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";
import { useForm } from "react-hook-form";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm({
  project: initialProject,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: initialProject,
  });

  const save = (project: Project) => {
    onSave(project);
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit(save)}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        placeholder="enter name"
        {...register("name", { required: "Project name is required" })}
      />
      {errors?.name && (
        <div className="card error">
          <p>{errors.name?.message}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <textarea
        placeholder="enter description"
        {...register("description", {
          required: "Project description is required",
        })}
      />
      {errors?.description && (
        <div className="card error">
          <p>{errors.description?.message}</p>
        </div>
      )}

      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        placeholder="enter budget"
        {...register("budget", {
          min: {
            value: 1,
            message: "Budget must be greater than 0",
          },
        })}
      />
      {errors?.budget && (
        <div className="card error">
          <p>{errors.budget?.message}</p>
        </div>
      )}

      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" {...register("isActive")} />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
